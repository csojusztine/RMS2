package rms.rmsmysql.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import rms.rmsmysql.entities.User;


import java.util.List;
import java.util.Optional;


public interface UserRepository extends CrudRepository<User, Integer> {
    //List<User> findById(Integer id);
    Boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
}
