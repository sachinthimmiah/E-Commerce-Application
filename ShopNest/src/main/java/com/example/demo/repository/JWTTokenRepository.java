package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.JWTToken;

import jakarta.transaction.Transactional;

public interface JWTTokenRepository extends JpaRepository<JWTToken, Integer> {

    // Find a token by its value
    Optional<JWTToken> findByToken(String token);

    // You don't need to define delete, as it's inherited from JpaRepository
    
    @Query("SELECT t FROM JWTToken t WHERE t.user.userId = :userId")
    JWTToken findByUserId(@Param("userId") int userId);

    
    // Custom query to delete tokens by user ID 
    @Modifying 
    @Transactional 
    @Query("DELETE FROM JWTToken t WHERE t.user.userId = :userId") 
    void deleteByUserId (@Param("userId") int userId);
}
