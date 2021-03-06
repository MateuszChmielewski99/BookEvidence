﻿// <auto-generated />
using BookCrc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BookCrc.Migrations
{
    [DbContext(typeof(BookDbContext))]
    partial class BookDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity("BookCrc.Model.Book", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("amount");

                    b.Property<string>("author_last_name")
                        .IsRequired();

                    b.Property<string>("title")
                        .IsRequired();

                    b.HasKey("id");

                    b.ToTable("Books");
                });
#pragma warning restore 612, 618
        }
    }
}
