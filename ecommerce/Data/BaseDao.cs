using Dapper.Contrib.Extensions;
using EcommerceBack.Models;
using Npgsql;

namespace EcommerceBack.Data
{
    public abstract class BaseDao
    {
        protected static IConfiguration config()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json", optional: true)
                        .Build();

            return configuration;
        }
    }
}
