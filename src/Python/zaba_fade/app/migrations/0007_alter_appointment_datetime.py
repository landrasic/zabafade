# Generated by Django 4.2.6 on 2023-11-01 22:19

import builtins
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_alter_user_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='dateTime',
            field=models.DateTimeField(verbose_name=builtins.locals),
        ),
    ]