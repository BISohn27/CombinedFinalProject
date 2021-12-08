package com.fm.elasticsearch.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.fm.elasticsearch.document.EnterpriseDocument;

public interface EnterpriseRepository extends ElasticsearchRepository<EnterpriseDocument, Integer>{
}
