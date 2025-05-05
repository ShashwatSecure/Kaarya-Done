package com.example.Kaarya_Done.dto;

public class SignupDtoCustomer {
    private String full_name;
    private String mobile;
    private String address;
    private String state;
    private String city;
    private String pincode;

    // Default constructor
    public SignupDtoCustomer() {
    }

    // Parameterized constructor
    public SignupDtoCustomer(String full_name, String mobile, String address, String state, String city, String pincode) {
        this.full_name = full_name;
        this.mobile = mobile;
        this.address = address;
        this.state = state;
        this.city = city;
        this.pincode = pincode;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    @Override
    public String toString() {
        return "SignupDtoCustomer{" +
                "full_name='" + full_name + '\'' +
                ", mobile='" + mobile + '\'' +
                ", address='" + address + '\'' +
                ", state='" + state + '\'' +
                ", city='" + city + '\'' +
                ", pincode='" + pincode + '\'' +
                '}';
    }
}
