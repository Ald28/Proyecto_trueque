import os
import django

#python create_admin.py   

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trueque.settings')
django.setup()

from API.models import usuario, roles
from django.contrib.auth.hashers import make_password

def create_admin():
    try:
        role, created = roles.objects.get_or_create(tipo='administrador')
        admin_user = usuario(
            name="Admin",
            lastname="Admin",
            phone="999999999",
            email="admin@gmail.com",
            password=make_password("admin"),
            carrera_id=1,  # Asume que la carrera con id 1 existe
            roles=role,
            imagen='imagenes/perfil.png'  # Ajusta según tu lógica
        )
        admin_user.save()
        print("Administrador creado exitosamente")
    except Exception as e:
        print(f"Error creando el administrador: {e}")

if __name__ == '__main__':
    create_admin()
