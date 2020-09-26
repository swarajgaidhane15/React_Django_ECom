from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(
        max_length=None, allow_empty_file=False, allow_null=True, required=False)
    category = serializers.HyperlinkedIdentityField(
        view_name="api:category-detail")

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'image', 'category')
