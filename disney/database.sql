USE [master]
GO
/****** Object:  Database [movie_finder]    Script Date: 12/7/2022 08:09:51 ******/
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
/****** Object:  User [Alumno]    Script Date: 12/7/2022 08:09:51 ******/
CREATE USER [Alumno] FOR LOGIN [Alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Alumno]
GO
/****** Object:  Table [dbo].[Peliculas]    Script Date: 12/7/2022 08:09:51 ******/
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
/****** Object:  Table [dbo].[Personajes]    Script Date: 12/7/2022 08:09:51 ******/
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
/****** Object:  Table [dbo].[PersonajesXPeliculas]    Script Date: 12/7/2022 08:09:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajesXPeliculas](
	[fk_personaje] [int] NOT NULL,
	[fk_pelicula] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 12/7/2022 08:09:51 ******/
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
	[Token] [varchar](640) NULL,
	[TokenExpirationDate] [datetime] NULL
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [movie_finder] SET  READ_WRITE 
GO
