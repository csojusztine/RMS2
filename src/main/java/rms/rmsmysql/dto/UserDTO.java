package rms.rmsmysql.dto;

import lombok.Data;
import rms.rmsmysql.entities.User;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDTO {

    private String username;

    private String role;

    private User user;

}
