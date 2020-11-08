package rms.rmsmysql.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import rms.rmsmysql.entities.enums.Role;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(nullable = false, name = "name")
    private String name;

    @Column(nullable = false, name = "e_mail")
    private String e_mail;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;

    /*@Column(nullable = false, name = "role_type_id")
    private Integer role_type_id;*/


    @OneToMany(mappedBy = "user")
    private List<Machine> machines;

}




