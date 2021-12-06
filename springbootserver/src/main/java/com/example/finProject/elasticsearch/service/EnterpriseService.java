package com.example.finProject.elasticsearch.service;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.Operator;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import com.example.finProject.elasticsearch.document.EnterpriseDocument;
import com.example.finProject.elasticsearch.repository.EnterpriseRepository;

@Service
public class EnterpriseService {
	private EnterpriseRepository repository;
	
	@Qualifier("elasticsearchTemplate")
    @Autowired
	private ElasticsearchOperations elasticsearchOperations;
	
	@Autowired
	public EnterpriseService(EnterpriseRepository repository) {
		this.repository = repository;
	}
	
	public void save(final EnterpriseDocument enterprise) {
		repository.save(enterprise);
	}
	
	public EnterpriseDocument findById(final int eno) {
		return repository.findById(eno).orElse(null);
	}
	
	public  List<EnterpriseDocument> findBusinessByKeyword(final String search) {
		 NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
				  .withQuery(QueryBuilders.multiMatchQuery(search)
				    .field("ecategory")
				    .field("jibun_address")
				    .field("road_address")
				    .field("ename")
				    .field("introduction")
				    .field("detail_address")
				    .type(MultiMatchQueryBuilder.Type.CROSS_FIELDS)
				    .operator(Operator.AND))
				  	.build();
		 List<EnterpriseDocument> list = new ArrayList<>();
		 
		 try {
			 SearchHits<EnterpriseDocument> searchHits = elasticsearchOperations.search(
				      searchQuery, 
				      EnterpriseDocument.class,
				      IndexCoordinates.of("enterprise"));
			 
			 for(SearchHit<EnterpriseDocument> hit : searchHits) {
				 EnterpriseDocument business= hit.getContent();
				 list.add(business);
			 }
			 
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 return list;	    
	 }

	public  List<EnterpriseDocument> findBusinessByKeywordInRestaurant(final String search) {
		List<EnterpriseDocument> list = new ArrayList<>();
		BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
		boolQueryBuilder.must(QueryBuilders.matchQuery("ecategory", "음식점"));
		boolQueryBuilder.must(QueryBuilders.multiMatchQuery(search)
												.field("jibun_address")
												.field("ecategory")
											    .field("road_address")
											    .field("ename")
											    .field("introduction")
											    .field("detail_address")
											    .type(MultiMatchQueryBuilder.Type.CROSS_FIELDS)
											    .operator(Operator.AND));
		
		try {
			NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(boolQueryBuilder).build();
			SearchHits<EnterpriseDocument> searchHits = elasticsearchOperations.search(
					nativeSearchQuery, 
				      EnterpriseDocument.class,
				      IndexCoordinates.of("enterprise"));
			 
			 for(SearchHit<EnterpriseDocument> hit : searchHits) {
				 EnterpriseDocument business= hit.getContent();
				 list.add(business);
			 }
		}catch(Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	public  List<EnterpriseDocument> findBusinessByKeywordInCafe(final String search) {
		List<EnterpriseDocument> list = new ArrayList<>();
		BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
		boolQueryBuilder.must(QueryBuilders.matchQuery("ecategory", "카페"));
		boolQueryBuilder.must(QueryBuilders.multiMatchQuery(search)
												.field("jibun_address")
												.field("ecategory")
											    .field("road_address")
											    .field("ename")
											    .field("introduction")
											    .field("detail_address")
											    .type(MultiMatchQueryBuilder.Type.CROSS_FIELDS)
											    .operator(Operator.AND));
		
		try {
			NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(boolQueryBuilder).build();
			SearchHits<EnterpriseDocument> searchHits = elasticsearchOperations.search(
					nativeSearchQuery, 
				      EnterpriseDocument.class,
				      IndexCoordinates.of("enterprise"));
			 
			 for(SearchHit<EnterpriseDocument> hit : searchHits) {
				 EnterpriseDocument business= hit.getContent();
				 list.add(business);
			 }
		}catch(Exception e) {
			e.printStackTrace();
		}
		return list;
	}
}