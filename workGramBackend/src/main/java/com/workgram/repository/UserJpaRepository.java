package com.workgram.repository;


import org.springframework.data.repository.PagingAndSortingRepository;

import com.workgram.jpa.UsersEntity;

public interface UserJpaRepository extends PagingAndSortingRepository<UsersEntity, Integer>  {

}
