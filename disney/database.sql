USE [master]
GO
/****** Object:  Database [movie_finder]    Script Date: 4/7/2022 10:41:31 ******/
CREATE DATABASE [movie_finder]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'movie_finder', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\movie_finder.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'movie_finder_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\movie_finder_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [movie_finder] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [movie_finder].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [movie_finder] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [movie_finder] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [movie_finder] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [movie_finder] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [movie_finder] SET ARITHABORT OFF 
GO
ALTER DATABASE [movie_finder] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [movie_finder] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [movie_finder] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [movie_finder] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [movie_finder] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [movie_finder] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [movie_finder] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [movie_finder] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [movie_finder] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [movie_finder] SET  DISABLE_BROKER 
GO
ALTER DATABASE [movie_finder] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [movie_finder] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [movie_finder] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [movie_finder] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [movie_finder] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [movie_finder] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [movie_finder] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [movie_finder] SET RECOVERY FULL 
GO
ALTER DATABASE [movie_finder] SET  MULTI_USER 
GO
ALTER DATABASE [movie_finder] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [movie_finder] SET DB_CHAINING OFF 
GO
ALTER DATABASE [movie_finder] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [movie_finder] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [movie_finder] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'movie_finder', N'ON'
GO
ALTER DATABASE [movie_finder] SET QUERY_STORE = OFF
GO
USE [movie_finder]
GO
/****** Object:  User [alumno]    Script Date: 4/7/2022 10:41:31 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Peliculas]    Script Date: 4/7/2022 10:41:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Peliculas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](100) NOT NULL,
	[Titulo] [varchar](50) NOT NULL,
	[Fecha_creacion] [date] NOT NULL,
	[Calificacion] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personajes]    Script Date: 4/7/2022 10:41:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personajes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](100) NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Edad] [int] NULL,
	[Peso] [int] NULL,
	[Historia] [varchar](150) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajesXPeliculas]    Script Date: 4/7/2022 10:41:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajesXPeliculas](
	[fk_personaje] [int] NOT NULL,
	[fk_pelicula] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 4/7/2022 10:41:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[UserName] [varchar](50) NOT NULL,
	[Password] [varchar](50) NOT NULL,
	[Token] [varchar](64) NULL,
	[TokenExpirationDate] [datetime] NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Peliculas] ON 

INSERT [dbo].[Peliculas] ([Id], [Imagen], [Titulo], [Fecha_creacion], [Calificacion]) VALUES (1, N'lacenicienta', N'La Cenicienta', CAST(N'1996-02-02' AS Date), 5)
INSERT [dbo].[Peliculas] ([Id], [Imagen], [Titulo], [Fecha_creacion], [Calificacion]) VALUES (2, N'belladurmiente', N'La Bella Durmiente', CAST(N'1999-06-18' AS Date), 4)
INSERT [dbo].[Peliculas] ([Id], [Imagen], [Titulo], [Fecha_creacion], [Calificacion]) VALUES (3, N'toystory', N'Toy Story', CAST(N'2000-05-06' AS Date), 2)
INSERT [dbo].[Peliculas] ([Id], [Imagen], [Titulo], [Fecha_creacion], [Calificacion]) VALUES (5, N'freakyfriday', N'Freaky Friday', CAST(N'2000-04-10' AS Date), 5)
INSERT [dbo].[Peliculas] ([Id], [Imagen], [Titulo], [Fecha_creacion], [Calificacion]) VALUES (7, N'lizziesuperstar', N'Lizzie Superstar', CAST(N'2001-02-05' AS Date), 2)
SET IDENTITY_INSERT [dbo].[Peliculas] OFF
GO
SET IDENTITY_INSERT [dbo].[Personajes] ON 

INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (3, N'lacenicienta', N'Cenicienta', 20, 48, N'Cenicienta vive con su madrastra y sus dos hijas, quienes la obligan a realizar todas las tareas del hogar.')
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (4, N'lindsaylohan', N'Lindsay Lohan', 15, 52, N'Anna es una adolescente de 15 años de edad, que toca en una banda de rock con sus amigos. ')
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (5, N'lizziemcguire', N'Lizzie McGuire', 16, 55, N'Hilary Erhard Duff, conocida artísticamente como Hilary Duff, es una actriz, cantante, compositora, empresaria, autora estadounidense.')
SET IDENTITY_INSERT [dbo].[Personajes] OFF
GO
INSERT [dbo].[PersonajesXPeliculas] ([fk_personaje], [fk_pelicula]) VALUES (3, 1)
INSERT [dbo].[PersonajesXPeliculas] ([fk_personaje], [fk_pelicula]) VALUES (4, 5)
INSERT [dbo].[PersonajesXPeliculas] ([fk_personaje], [fk_pelicula]) VALUES (5, 7)
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([Id], [Nombre], [Apellido], [UserName], [Password], [Token], [TokenExpirationDate]) VALUES (1, N'Anto', N'Hauserman', N'antoHauserman', N'antoniette', NULL, NULL)
INSERT [dbo].[Usuarios] ([Id], [Nombre], [Apellido], [UserName], [Password], [Token], [TokenExpirationDate]) VALUES (2, N'Dali', N'Orbaj', N'daliOrbaj', N'delilah', NULL, NULL)
INSERT [dbo].[Usuarios] ([Id], [Nombre], [Apellido], [UserName], [Password], [Token], [TokenExpirationDate]) VALUES (3, N'Polshu', N'Polshu', N'polshuPolshu', N'polshetta', NULL, NULL)
INSERT [dbo].[Usuarios] ([Id], [Nombre], [Apellido], [UserName], [Password], [Token], [TokenExpirationDate]) VALUES (4, N'Lady', N'Gaga', N'ladyGaga', N'paparazzi', NULL, NULL)
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
USE [master]
GO
ALTER DATABASE [movie_finder] SET  READ_WRITE 
GO
