from django.http.request import HttpRequest
import math
from rest_framework.response import Response
from rest_framework import status, serializers
from django.db.models import QuerySet


def filter_by_request_params(request: HttpRequest, queryset: QuerySet, allowed_filters = []) -> QuerySet:
    for allowed_filter in allowed_filters:
        search_param = request.GET.get(allowed_filter)
        if search_param:
            queryset = queryset.filter(**{allowed_filter: search_param})
    return queryset

def create_pagable_list_response(request: HttpRequest, queryset: QuerySet, serializer: serializers.ModelSerializer):
    page_num = int(request.GET.get("page", 1))
    limit_num = int(request.GET.get("limit", 10))
    start_num = (page_num - 1) * limit_num
    end_num = limit_num * page_num
    
    cnt = queryset.count()
    queryset = serializer(queryset[start_num:end_num], many="true")
    return Response(
        {
            "total": cnt,
            "page": page_num,
            "last_page": math.ceil(cnt / limit_num),
            "result" : queryset.data
        },
        status=status.HTTP_200_OK)