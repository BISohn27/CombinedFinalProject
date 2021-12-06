package com.example.finProject.elasticsearch.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.example.finProject.elasticsearch.document.EnterpriseDocument;

public interface EnterpriseRepository extends ElasticsearchRepository<EnterpriseDocument, Integer>{
}
