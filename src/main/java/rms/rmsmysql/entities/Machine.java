package rms.rmsmysql.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;
import org.springframework.format.annotation.DateTimeFormat;
import rms.rmsmysql.entities.enums.Status;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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


    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "reparation_limit")
    private Integer reparation_limit;

    @Column(name = "single_work_limit", updatable = false)
    private Integer single_work_limit;

    @Column(name = "identifier", updatable = false, unique=true)
    private Long identifier;

    @Column(name = "arriving_date", updatable = false)
    @DateTimeFormat(pattern= "yyyy-MM-dd")
    private LocalDate arriving_date = LocalDate.now();

    @Column(name = "customers_email", updatable = false)
    private String customers_email;

    @PrePersist
    protected void onCreate() {
        setIdentifier(UUID.randomUUID().getMostSignificantBits());
    }



    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Work> works;


    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private User user;



}



