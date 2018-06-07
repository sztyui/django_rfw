# Generated by Django 2.0.6 on 2018-06-07 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Packages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField(default=1)),
                ('price', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Station',
            fields=[
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(default='', max_length=100)),
                ('weight', models.FloatField(default=1)),
                ('price', models.FloatField(default=0)),
                ('order', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
    ]
