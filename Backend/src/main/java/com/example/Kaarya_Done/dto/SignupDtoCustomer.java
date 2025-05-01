package com.example.Kaarya_Done.dto;

public class SignupDtoCustomer {
    private String full_name;
    private String mobile;
    private String address;
    private String photo_url;

    // Default constructor
    public SignupDtoCustomer() {
    }

    // Parameterized constructor
    public SignupDtoCustomer(String full_name, String mobile, String address, String photo_url) {
        this.full_name = full_name;
        this.mobile = mobile;
        this.address = address;
        this.photo_url = photo_url;
    }

    // Getters and Setters
    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
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

    public String getPhoto_url() {
        return photo_url;
    }

    public void setPhoto_url(String photo_url) {
        this.photo_url = photo_url;
    }

    @Override
    public String toString() {
        return "SignupDto{" +
                "full_name='" + full_name + '\'' +
                ", mobile='" + mobile + '\'' +
                ", address='" + address + '\'' +
                ", photo_url='" + photo_url + '\'' +
                '}';
    }
}
