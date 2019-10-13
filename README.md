# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# ChatSpace DB設計

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text_id|integer|null: false|
|image_id|integer|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
- has_one :text
- has_many :images

## textsテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|

### Association
- belongs_to :messages

## imagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|null: false|

### Association
- belongs_to :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: groups_users
- has_many :groups_users
- has_many :messages

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_masy :groups, through: groups_users
- has_many :groups_users
- has_many :messages

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
