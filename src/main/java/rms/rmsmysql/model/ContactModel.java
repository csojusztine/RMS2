package rms.rmsmysql.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import rms.rmsmysql.entities.Work;

import javax.validation.constraints.Email;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContactModel {
    private String manufacturer;

    private String type;

    private String description;

    private Integer price;

    @Email
    private String customers_email;

    private String note;

    private Work work;
}
