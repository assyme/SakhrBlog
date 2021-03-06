USE [master]
GO
/****** Object:  Database [SakhrBlog]    Script Date: 04/13/2014 00:37:19 ******/
CREATE DATABASE [SakhrBlog] ON  PRIMARY 
( NAME = N'SakhrBlog', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS08\MSSQL\DATA\SakhrBlog.mdf' , SIZE = 2048KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'SakhrBlog_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS08\MSSQL\DATA\SakhrBlog_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [SakhrBlog] SET COMPATIBILITY_LEVEL = 90
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SakhrBlog].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SakhrBlog] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [SakhrBlog] SET ANSI_NULLS OFF
GO
ALTER DATABASE [SakhrBlog] SET ANSI_PADDING OFF
GO
ALTER DATABASE [SakhrBlog] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [SakhrBlog] SET ARITHABORT OFF
GO
ALTER DATABASE [SakhrBlog] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [SakhrBlog] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [SakhrBlog] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [SakhrBlog] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [SakhrBlog] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [SakhrBlog] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [SakhrBlog] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [SakhrBlog] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [SakhrBlog] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [SakhrBlog] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [SakhrBlog] SET  DISABLE_BROKER
GO
ALTER DATABASE [SakhrBlog] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [SakhrBlog] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [SakhrBlog] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [SakhrBlog] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [SakhrBlog] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [SakhrBlog] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [SakhrBlog] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [SakhrBlog] SET  READ_WRITE
GO
ALTER DATABASE [SakhrBlog] SET RECOVERY SIMPLE
GO
ALTER DATABASE [SakhrBlog] SET  MULTI_USER
GO
ALTER DATABASE [SakhrBlog] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [SakhrBlog] SET DB_CHAINING OFF
GO
USE [SakhrBlog]
GO
/****** Object:  Table [dbo].[Posts]    Script Date: 04/13/2014 00:37:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[PostDetail] [nvarchar](250) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Posts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  UserDefinedTableType [dbo].[CategoryIds]    Script Date: 04/13/2014 00:37:21 ******/
CREATE TYPE [dbo].[CategoryIds] AS TABLE(
	[Id] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  Table [dbo].[Users]    Script Date: 04/13/2014 00:37:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Blogs]    Script Date: 04/13/2014 00:37:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Blogs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Blogs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [UK_Blogs_UserId] UNIQUE NONCLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 04/13/2014 00:37:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[BlogId] [int] NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Posts_Categories]    Script Date: 04/13/2014 00:37:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posts_Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NOT NULL,
	[CategoryId] [int] NOT NULL,
 CONSTRAINT [PK_Posts_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserPosts]    Script Date: 04/13/2014 00:37:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Asad Sayeed
-- Create date: 11-Apr-2014
-- Description:	Gets User poses
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetUserPosts] 
	@userId int = 0,
	@rowCount int = 2,
	@pageIndex int = 0,
	@filter dbo.CategoryIds READONLY
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    select * Into #temp from
	(
		select Posts.Id PostId, Posts.Name PostName, Posts.PostDetail,
		Categories.Id CategoryId
		from Posts	
		inner join Posts_Categories
		on Posts.Id = Posts_Categories.PostId
		inner join Categories
		on Categories.Id = Posts_Categories.CategoryId
		inner join Blogs
		on Blogs.Id = BlogId
		where UserId = @userId AND
		CategoryId NOT IN (Select Id from @filter)
		
	) as tbl
	
	
	select PostId, PostName, PostDetail, STUFF((
    SELECT '| ' + CAST([CategoryId] AS VARCHAR(MAX))  
    FROM #temp 
    WHERE (PostId = Results.PostId) 
    FOR XML PATH(''),TYPE).value('(./text())[1]','VARCHAR(MAX)')
    ,1,2,'') AS CategoryIds,
    ROW_NUMBER() over (order by PostId) as rowNumber 
  
  into #temp2 from #temp Results 
  Group by PostId,PostName,PostDetail
	
  select  *,(select MAX(rowNumber) from #temp2) TotalRows from #temp2
  Where rowNumber between ((@pageIndex * @rowCount) + 1) AND ((@pageIndex * @rowCount) + @rowCount);		
	--select * from #temp
	--Categories.Id CategoryId, Categories.Name CategoryName, 
		--ROW_NUMBER() over (Order By Posts.Id)as rowNumber from Posts 
	
	--Select *, ROW_NUMBER() over (Order By Posts.Id)as rowNumber from allPosts
	
	--With allPosts AS 

	--Select *, (select MAX(rowNumber) from allPosts) TotalRows  from allPosts
	
	
	
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllPostsOnDate]    Script Date: 04/13/2014 00:37:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		AsadSayeed
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetAllPostsOnDate] 
	-- Add the parameters for the stored procedure here
	@userId int = 0, 
	@createdOn Date = GetDate
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * Into #temp from
	(
		select Posts.Id PostId, Posts.Name PostName, Posts.PostDetail,Posts.CreatedOn,
		Categories.Id CategoryId
		from Posts	
		inner join Posts_Categories
		on Posts.Id = Posts_Categories.PostId
		inner join Categories
		on Categories.Id = Posts_Categories.CategoryId
		inner join Blogs
		on Blogs.Id = BlogId
		where UserId = @userId AND CONVERT(DATETIME, FLOOR(CONVERT(FLOAT, Posts.CreatedOn))) = @createdOn  
		
		
	) as tbl

    select * from #temp
	
END
GO
/****** Object:  StoredProcedure [dbo].[sp_AddNewPost]    Script Date: 04/13/2014 00:37:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Asad
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_AddNewPost] 
	-- Add the parameters for the stored procedure here
	@name nvarchar(50) = '', 
	@detail nvarchar(250) = '',
	@filter dbo.CategoryIds READONLY
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	select * from Posts
	
	select * from Posts_Categories
	
	DECLARE @InsertedId table (
		PostId int
	)
	
	
	insert into Posts (Name,PostDetail,CreatedOn) 
	OUTPUT inserted.Id into @InsertedId 
	values(@name,@detail,GetDate())
	
    -- Insert statements for procedure here
    
    
    INSERT into Posts_Categories(PostId, CategoryId)
    Select a.PostId, b.Id CategoryId
    FROM @InsertedId a, @filter b
	
END
GO
/****** Object:  StoredProcedure [dbo].[GetSortedPostsByCategories]    Script Date: 04/13/2014 00:37:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Asad Sayeed
-- Create date: 11-Apr-2014
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[GetSortedPostsByCategories] 
	@SortColumn int = 0,
	@tvpids dbo.CategoryIds READONLY
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Select Posts.*,Posts_Categories.CategoryId from Posts 
	inner join Posts_Categories
	on Posts.Id = Posts_Categories.PostId
	Where CategoryId in (select Id from @tvpids)
	Order By
	Case (@SortColumn)
	 when 0 then Posts.Id
	 When 1 then Posts.Name
	 When 2 then Posts.PostDetail 
	End
	ASC
	select @SortColumn
	
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllCategoryWithPostCount]    Script Date: 04/13/2014 00:37:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Asad Palekar
-- Create date: 10-Apr-2014
-- Description:	Gets all categories with post count
-- =============================================
CREATE PROCEDURE [dbo].[GetAllCategoryWithPostCount] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;	
	select Cat.Id, Cat.Name,Cat.BlogId, COALESCE(temp.PostCount,0) PostCount from Categories as Cat
	FULL OUTER Join 
	(Select pc.CategoryId as CatId, Count(*) as PostCount from Posts_Categories pc group by pc.CategoryId ) as temp 
	ON Cat.Id = temp.CatId
END
GO
/****** Object:  Default [DF__Posts__CreatedOn__22AA2996]    Script Date: 04/13/2014 00:37:20 ******/
ALTER TABLE [dbo].[Posts] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
/****** Object:  ForeignKey [FK_Blogs_Users]    Script Date: 04/13/2014 00:37:21 ******/
ALTER TABLE [dbo].[Blogs]  WITH CHECK ADD  CONSTRAINT [FK_Blogs_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Blogs] CHECK CONSTRAINT [FK_Blogs_Users]
GO
/****** Object:  ForeignKey [FK_Categories_Blogs]    Script Date: 04/13/2014 00:37:21 ******/
ALTER TABLE [dbo].[Categories]  WITH CHECK ADD  CONSTRAINT [FK_Categories_Blogs] FOREIGN KEY([BlogId])
REFERENCES [dbo].[Blogs] ([Id])
GO
ALTER TABLE [dbo].[Categories] CHECK CONSTRAINT [FK_Categories_Blogs]
GO
/****** Object:  ForeignKey [FK_Posts_Categories_Categories]    Script Date: 04/13/2014 00:37:21 ******/
ALTER TABLE [dbo].[Posts_Categories]  WITH CHECK ADD  CONSTRAINT [FK_Posts_Categories_Categories] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[Posts_Categories] CHECK CONSTRAINT [FK_Posts_Categories_Categories]
GO
/****** Object:  ForeignKey [FK_Posts_Categories_Posts]    Script Date: 04/13/2014 00:37:21 ******/
ALTER TABLE [dbo].[Posts_Categories]  WITH CHECK ADD  CONSTRAINT [FK_Posts_Categories_Posts] FOREIGN KEY([PostId])
REFERENCES [dbo].[Posts] ([Id])
GO
ALTER TABLE [dbo].[Posts_Categories] CHECK CONSTRAINT [FK_Posts_Categories_Posts]
GO
