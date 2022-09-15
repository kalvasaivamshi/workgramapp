package com.workgram.repository;



import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.workgram.jpa.FreelancerEntity;
import com.workgram.jpa.WorkshopsEntity;


public interface WorkshopJpaRepository extends PagingAndSortingRepository<WorkshopsEntity, Integer>  {
	List<WorkshopsEntity> findByUsername(String username);
}
