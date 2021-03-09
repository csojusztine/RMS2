package rms.rmsmysql.security;

import lombok.Data;
import rms.rmsmysql.entities.User;

@Data
public class CurrentUser {
    private String username;

    private User user;
}
