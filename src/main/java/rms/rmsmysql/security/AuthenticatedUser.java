package rms.rmsmysql.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import rms.rmsmysql.entities.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticatedUser {
    private User user;
}