# tour-and-travel-server

User
Tour
Review

user {
name
email
age
photo
role -> user, admin
status -> active, inactive
}

tour {
name
duration
rating
price
coverImage
image[]
startDate
tourLocation
}

review {
review
rating
tour -> ref
user -> ref
}
