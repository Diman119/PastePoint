# Generated by Django 4.2.6 on 2024-02-20 17:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('paste', '0003_remove_paste_password_alter_paste_access_mode'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paste',
            name='access_mode',
        ),
    ]
