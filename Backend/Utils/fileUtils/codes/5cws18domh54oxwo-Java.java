import java.util.Scanner;

public class SumCalculator {
    public static void main(String[] args) {
        // The Scanner class is used to read input from the console
        Scanner scanner = new Scanner(System.in);
        
        int num1, num2, sum;

        // Read the first number
        num1 = scanner.nextInt();

        // Read the second number
        num2 = scanner.nextInt();

        sum = num1 + num2;

        // Print the result to the console
        System.out.println("The sum of " + num1 + " and " + num2 + " is: " + sum);

        scanner.close();
    }
}