//Select list user - relationship
select  relationship.id, (select concat(users.lastname,' ', users.firstname) as user1
from users where relationship.iduserone = users.id )  as user1, (select concat(users.lastname,' ', users.firstname) as user2
from users where relationship.idusertwo = users.id )  as user2, statustype.nametype
from relationship join users on users.id = relationship.iduserone
join statustype on statustype.id = relationship.idstatus

//select
select * from animes inner join (
	select anime_genre.anime_id, array_agg(genrename), array_agg(anime_genre.genre_id) from anime_genre inner join genres on anime_genre.genre_id = genres.id
GROUP BY anime_genre.anime_id
ORDER BY anime_genre.anime_id) as A
on animes.id = a.anime_id
