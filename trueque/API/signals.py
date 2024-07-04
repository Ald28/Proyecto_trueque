from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.db import migrations
from django.apps import apps

@receiver(post_migrate)
def insert_initial_data(sender, **kwargs):
    if sender.name == 'API':
        carrera_model = apps.get_model('API', 'carrera')
        roles_model = apps.get_model('API', 'roles')

        # Insertar datos en carrera
        carreras = [
            'Electricidad Industrial',
            'Electrónica Industrial',
            'Mecánica Automotriz',
            'Mantenimiento de Maquinaria Pesada',
            'Seguridad y Salud Ocupacional',
            'Tecnología Agrícola',
            'Diseño y Desarrollo de Software',
            'Big Data y Ciencia de Datos',
            'Electrónica y Automatización Industrial',
            'Mecatrónica',
            'Minería, Procesos Químicos y Metalúrgicos',
            'Tecnología Digital'
        ]
        for carrera_name in carreras:
            carrera_model.objects.get_or_create(carrera=carrera_name)

        # Insertar datos en roles
        roles_data = ['usuario', 'administrador']
        for role_name in roles_data:
            roles_model.objects.get_or_create(tipo=role_name)