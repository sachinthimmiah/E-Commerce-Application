package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CartItem;
import com.example.demo.entity.User;

import jakarta.transaction.Transactional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer> {

//    Optional<CartItem> findByUserAndProduct(User user, Product product);

    @Query("SELECT COALESCE(SUM(c.quantity), 0) FROM CartItem c WHERE c.user = :user")
    int countTotalItems(@Param("user") User user);

    List<CartItem> findAllByUser(User user);

//     Removed this duplicate method
     @Query("SELECT c FROM CartItem c WHERE c.user.userId = :userId AND c.product.productId = :productId")
     Optional<CartItem> findByUserAndProduct(@Param("userId") int userId, @Param("productId") int productId);

     @Query("SELECT c FROM CartItem c JOIN FETCH c.product p WHERE c.user.userId = :userId")
     List<CartItem> findCartItemsWithProductDetails(@Param("userId") int userId);

     @Query("UPDATE CartItem c SET c.quantity = : quantity WHERE c.id = :cartItemId") 
     void updateCartItemQuantity (int cartItemId, int quantity);
     
     @Modifying
     @Query("DELETE FROM CartItem c WHERE c.user.userId = :userId AND c.product.productId = :productId")
     void deleteCartItem(@Param("userId") int userId, @Param("productId") int productId);

     @Modifying
     @Query("DELETE FROM CartItem c WHERE c.user.userId = :userId")
	void deleteAllCartItemsByUserId(int userId);

     
}
