# Generated by Django 5.0.6 on 2024-07-01 01:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0012_usuario_groups_usuario_is_active_usuario_is_staff_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='password',
            field=models.CharField(max_length=128, verbose_name='password'),
        ),
    ]
