package rms.rmsmysql.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "works")
public class Work {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(unique = true, name = "description")
        private String description;

        @Column(name = "price")
        private Integer price;

        @ManyToMany(mappedBy = "works")
        @JsonIgnore
        private List<Machine> machines;


}





