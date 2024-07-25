# Generated by Django 5.0.2 on 2024-03-03 07:24

import StoreApp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StoreApp', '0005_alter_customer_info_invoice_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer_info',
            name='Invoice_no',
            field=models.BigIntegerField(unique=True, validators=[StoreApp.models.validate_positive]),
        ),
        migrations.AlterField(
            model_name='customer_info',
            name='Token_id',
            field=models.CharField(editable=False, unique=True),
        ),
    ]
