# Generated by Django 4.2.6 on 2023-10-22 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_rename_pdw_user_pwd'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='appointment',
        ),
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.CharField(default='random@email.xyz', max_length=100),
            preserve_default=False,
        ),
    ]