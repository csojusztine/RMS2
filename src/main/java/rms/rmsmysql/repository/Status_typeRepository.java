package rms.rmsmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rms.rmsmysql.entities.Status_type;
import rms.rmsmysql.entities.Work;

public interface Status_typeRepository extends JpaRepository<Status_type, Integer> {

}