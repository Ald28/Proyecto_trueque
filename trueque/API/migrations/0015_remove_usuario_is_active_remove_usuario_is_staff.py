# Generated by Django 5.0.6 on 2024-07-01 06:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0014_alter_usuario_imagen'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='usuario',
            name='is_staff',
        ),
    ]