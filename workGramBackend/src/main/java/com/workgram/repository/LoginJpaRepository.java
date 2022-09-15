package com.workgram.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.workgram.jpa.LoginEntity;

public interface LoginJpaRepository extends PagingAndSortingRepository<LoginEntity, Integer> {
	LoginEntity findByUsernameAndPassword(String username, String password);
	LoginEntity findByUsername(String username);
	
}
