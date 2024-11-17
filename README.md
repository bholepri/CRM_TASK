This README provides documentation for using the Twitter API endpoint that retrieves user information by username and includes public metrics.
https://api.twitter.com/2/users/by/username/:username?user.fields=public_metrics

#Prerequisites
1.Twitter Developer Account
2.Bearer Token
3.API Access Level

#Endpoint Details
Base URL:
https://api.twitter.com/2/users/by/username/:username

Method:
GET
Path Parameter:
:username (string): The username of the Twitter user to retrieve.

Query Parameters:
user.fields (string): A comma-separated list of fields to include in the response. 
For this endpoint:
Include public_metrics to retrieve metrics such as follower count.
