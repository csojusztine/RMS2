package rms.rmsmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rms.rmsmysql.entities.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Optional<Customer> findById(Integer id);
}
