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
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true, name = "username")
    private String username;

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




