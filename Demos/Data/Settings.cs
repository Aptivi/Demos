namespace Demos.Data
{
    public static class Settings
    {
        public static bool usesGhPages =
#if GHPAGES
            true
#else
            false
#endif
        ;
    }
}
