package com.workgram.repository;
import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.workgram.jpa.FreelancerEntity;

public interface FreelancerJpaRepository extends PagingAndSortingRepository<FreelancerEntity, Integer>{
	List<FreelancerEntity> findByUsername(String username);
	
}
