package com.bookit.demo.enums;

public enum UserRoles {
    CLIENT,
    OWNER,
    COMPANY,

    ANONIM;
    public boolean isClient(){
        return this == CLIENT;
    }

    public boolean isCompany(){
        return this == CLIENT;
    }

    public boolean isOwner(){
        return this == CLIENT;
    }

    public boolean isAnonim(){
        return this == ANONIM;
    }
}
