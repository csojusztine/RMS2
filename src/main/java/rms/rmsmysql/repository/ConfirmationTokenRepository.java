package rms.rmsmysql.repository;

import org.springframework.data.repository.CrudRepository;
import rms.rmsmysql.entities.ConfirmationToken;

public interface ConfirmationTokenRepository extends CrudRepository<ConfirmationToken, String> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
}
