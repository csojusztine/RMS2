package rms.rmsmysql.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import rms.rmsmysql.entities.enums.Status;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "Machines")
public class Machine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, name= "manufacturer")
    private String manufacturer;

    @Column(nullable = false, name = "type")
    private String type;

    @Column(nullable = false, name = "description_of_failure")
    private String description_of_failure;

    @Column(name = "reparation_price")
    private Integer reparation_price;

    /*@Column(nullable = false, name = "status_id")
    private Integer status_id;*/
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;


    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore

    private List<Work> works;


    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private User user;


}



