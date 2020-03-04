import os
import json
from flask import Flask,make_response,render_template,request, redirect,jsonify,Response,url_for, session, g
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from BackEnd.database.manager import Manager
from BackEnd.resources.Producto.Producto import Producto
from BackEnd.resources.Tienda.Tienda import Tienda


from os import path
ROOT = path.dirname(path.realpath(__file__))
#print(ROOT)

mg=Manager()
app = Flask(__name__)
app.secret_key="aca-va-la-clave-secreta"
tienda=[]
producto=[]
#app.config['IMG_PRODUCTOS'] = './static/img_productos'
#app.config['IMG_TIENDAS'] = './static/img_tiendas'

"""las siguientes rutas funcionan en pythonanywhere"""

app.config['IMG_PRODUCTOS'] = str(ROOT+'/static/img_productos')
app.config['IMG_TIENDAS'] = str(ROOT+'/static/img_tiendas')

app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024
extensiones_permitidas = set(['png', 'jpg', 'jpeg'])

def extension_valida(nombre):
    return '.' in nombre and \
           nombre.rsplit('.', 1)[1].lower() in extensiones_permitidas

@app.before_request
def load_logged_in_user():
    user_id = session.get('id_tienda')

    if user_id is None:
        g.user = None
    else:
        g.user=mg.extraer_tienda(user_id,True)
        print(g.user)
        print(g.user[2])
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('tutienda'))
        return f(*args, **kwargs)
    return decorated_function
@app.route('/usuario', methods=['GET','POST'])

def usuario():
    headers = {'Content-Type': 'text/html'}
    if request.method=='POST':

        correo=request.form['correo']
        contrasena=request.form['contrasena']
        validacion=mg.es_usuario(correo)
        if validacion:
            if check_password_hash(validacion[1],contrasena):
                session.clear()
                session['usuario']=correo
                session['autentificado']=True
                session['id_tienda']=validacion[0]
                return redirect(url_for('usuario_tienda'))
        session.clear()
        return redirect(url_for('tutienda'))



    return make_response(render_template('index.html'),200,headers)

@app.route('/')
@app.route('/tutienda',methods=['GET','POST'])
def tutienda():
    global tienda
    tienda=mg.extraer_n_tiendas_orden(12,'aleatorio')
    headers = {'Content-Type': 'text/html'}
    return make_response(render_template('index.html'),200,headers)


@app.route('/usuario_tienda',methods=['GET','POST'])
@login_required
def usuario_tienda():
    global tienda
    global producto
    id_tienda=g.user[0]
    if request.method == 'POST':
        datos = dict(request.form)
        mg.modificar_datos_tienda(id_tienda,datos)
        tienda=mg.extraer_tienda(id_tienda)

        return redirect(url_for('usuario_tienda'))


    producto=mg.extraer_productos_tienda(id_tienda)
    tienda=mg.extraer_tienda(id_tienda)
    headers = {'Content-Type': 'text/html'}
    return make_response(render_template('vista_usuario_tienda.html'),200,headers)

@app.route('/carga_producto', methods=['GET','POST'])
@login_required
def carga_producto_id():
    id_tienda_madre=g.user[0]
    if request.method == 'POST':
            archivo=request.files['imagen_producto']
            nombre_archivo = secure_filename(archivo.filename)
            if not extension_valida(nombre_archivo):
                return render_template('carga_producto.html',mensaje="""No se pduo cargar el archivo!!!!, el formato
            o nombre de la  imagen que desea cargar no es valido""")
            else:
                archivo.save(os.path.join(app.config['IMG_PRODUCTOS'], nombre_archivo))
                id_tienda=id_tienda_madre
                nombre_producto=request.form['nombre_producto']
                descripcion_producto=request.form['descripcion_producto']
                precio_producto=request.form['precio_producto']
                ruta_imagen_producto=str("/static/img_productos/"+nombre_archivo)
                producto=Producto(id_tienda,nombre_producto,descripcion_producto,ruta_imagen_producto,
                precio_producto)
                mg.agregar_producto(producto,id_tienda)

                #return redirect(url_for('usuario_tienda',id_tienda=id_tienda))
                return redirect(url_for('usuario_tienda'))

    headers = {'Content-Type': 'text/html'}
    return make_response(render_template('carga_producto.html'),200,headers)

@app.route('/buscar',methods=['GET','POST'])
def busqueda():
    headers = {'Content-Type': 'text/html'}
    if request.method=='POST':
        buscar=request.form['buscar']
        global tienda
        tienda =mg.extraer_n_tiendas_orden(12,'desc',buscar)

        return make_response(render_template('index.html',))


    return make_response(render_template('index.html'),200,headers)

@app.route('/publico/<id_tienda>')
def publico(id_tienda):
    if id_tienda=="crear":
        return redirect(url_for('formulario'))
    else:
        global producto
        producto=mg.extraer_productos_tienda(id_tienda)
        global tienda
        tienda=mg.extraer_tienda(id_tienda)
        return render_template('vista_publico_tienda.html')

@app.route('/buscar_categoria/<categoria>')
def buscar_categoria(categoria):
    global tienda
    tienda=mg.extraer_n_tiendas_orden(12,'desc',categoria,'categoria')
    return render_template('index.html')

@app.route('/unt')
def unt():
    global tienda
    return (jsonify(tienda))

@app.route('/productoeditar')
def producto_edit():
    global producto
    return(jsonify(producto))

@app.route('/producto')
def prod():
    global producto
    return (jsonify(producto))

@app.route('/nueva_imagen_p/<id_producto>', methods=['GET','POST'])
@login_required
def nueva_imagen_p(id_producto):
    id_tienda=g.user[0]
    global producto
    if request.method == 'POST':
        archivo=request.files['ruta_imagen']
        nombre_archivo = secure_filename(archivo.filename)
        if not extension_valida(nombre_archivo):
            return render_template('editar_producto.html',mensaje="""No se pduo cargar el archivo!!!!, el formato
            o nombre de la  imagen que desea cargar no es valido""")
        else:
            archivo.save(os.path.join(app.config['IMG_PRODUCTOS'], nombre_archivo))
            ruta_imagen_producto=str("/static/img_productos/"+nombre_archivo)
            datos = {'ruta_imagen':ruta_imagen_producto}
            mg.modificar_datos_producto(id_producto,datos)
            producto=mg.extraer_producto_id_tienda_id_producto(id_tienda,id_producto)
            headers = {'Content-Type': 'text/html'}
            return make_response(render_template('editar_producto.html'),200,headers)
    return make_response(render_template('editar_producto.html'),200,headers)


@app.route('/editar_producto/<id_producto>', methods=['GET','POST'])
@login_required
def editar(id_producto):
    id_tienda=g.user[0]
    global producto
    producto=mg.extraer_producto_id_tienda_id_producto(id_tienda,id_producto)
    if request.method == 'POST':
        datos = dict(request.form)
        mg.modificar_datos_producto(id_producto,datos)
        producto=mg.extraer_producto_id_tienda_id_producto(id_tienda,id_producto)
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('editar_producto.html'),200,headers)
    return render_template('editar_producto.html')

@app.route('/formulario',methods=['GET','POST'])
def formulario():
    if g.user:
        return redirect(url_for('tutienda'))
    if request.method=='POST':
        global tienda
        archivo=request.files['imagen_tienda']
        nombre_archivo = secure_filename(archivo.filename)
        if not extension_valida(nombre_archivo):
            return render_template('formulario.html',mensaje="""No se pduo cargar el archivo!!!!, el formato
            o nombre de la  imagen que desea cargar no es valido""")
        else:
            nombre_tienda=request.form['nombre_tienda']
            correo_tienda=request.form['correo_tienda']
            if not mg.verificar_nombre_disponible('nombre',nombre_tienda):
                return render_template('formulario.html',mensaje="""EL nombre ingresado no se encuentra disponible""")
            if not mg.verificar_nombre_disponible('correo',correo_tienda):
                return render_template('formulario.html',mensaje="""El correo ingresado ya está registrado""")
            archivo.save(os.path.join(app.config['IMG_TIENDAS'], nombre_archivo))
            direccion_tienda=request.form['direccion_tienda']
            celular_tienda=request.form['celular_tienda']
            ruta_imagen_tienda=str("/static/img_tiendas/"+nombre_archivo)
            categoria_tienda=request.form['categoria_tienda']
            metadata_tienda=request.form['contrasena_tienda']
            contrasena=generate_password_hash(metadata_tienda)
            nueva_tienda=Tienda(nombre_tienda,direccion_tienda,categoria_tienda,ruta_imagen_tienda,
            correo_tienda,celular_tienda,contrasena)
            id_real=mg.agregar_tienda(nueva_tienda)
            tienda=mg.extraer_tienda(id_real)
            session.clear()
            session['usuario']=correo_tienda
            session['autentificado']=True
            session['id_tienda']=id_real
            return redirect(url_for('usuario_tienda'))



    headers = {'Content-Type': 'text/html'}
    return make_response(render_template('formulario.html'),200,headers)

@app.route('/acerca')
def acerca():
    return render_template('acerca_de.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('tutienda'))


