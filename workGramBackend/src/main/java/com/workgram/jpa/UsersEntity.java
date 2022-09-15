package com.workgram.jpa;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name="users", catalog="workgram" )
// Define named queries here
@NamedQueries ( {
	@NamedQuery ( name="UsersEntity.countAll", query="SELECT COUNT(x) FROM UsersEntity x" )
} )
public class UsersEntity  implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", nullable=false)
	private Integer    id    ; 
	@Column(name="username", length=50)
    private String     username ;
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@Column(name="name", length=50)
    private String     name ;
	@Column(name="mobile", length=50)
    private String     mobile ;
	@Column(name="address", length=50)
    private String     address ;
	@Column(name="email", length=50)
    private String     email ;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
