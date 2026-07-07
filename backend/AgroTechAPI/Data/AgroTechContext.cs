using Microsoft.EntityFrameworkCore;
using AgroTech.Models;

namespace AgroTech.Data;

public class AgroTechContext : DbContext
{
    public AgroTechContext(DbContextOptions<AgroTechContext> options)
        : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }

    public DbSet<Safra> Safras { get; set; }

    public DbSet<Categoria> Categorias { get; set; }

    public DbSet<Lancamento> Lancamentos { get; set; }
}
