package com.workgram.repository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.workgram.jpa.RatingsEntity;




public interface RatingsJpaRepository extends PagingAndSortingRepository<RatingsEntity, Integer> {

}
