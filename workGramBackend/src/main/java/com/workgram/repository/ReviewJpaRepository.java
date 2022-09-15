package com.workgram.repository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.workgram.jpa.ReviewsEntity;



public interface ReviewJpaRepository extends PagingAndSortingRepository<ReviewsEntity, Integer> {

}
