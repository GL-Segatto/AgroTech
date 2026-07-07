namespace AgroTech.Models;

public class Lancamento
{
    public int Id { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public string Categoria { get; set; } = string.Empty;

    public string Tipo { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    public DateTime Data { get; set; }
}
